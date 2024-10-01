module Api
  class AnnouncementsController < ApplicationController
    before_action :authenticate_user!, only: [:destroy, :update]

    def index
      @announcements = Announcement.order(created_at: :desc)
      if @announcements
        render json: {announcements: @announcements}, status: :ok
      else
        render json: { error: 'announcements not found' }, status: :not_found
      end
    end

    def destroy
      unless @user.admin?
        return render json: {error: 'Unauthorized'}, status: :forbidden
      end

      announcement = Announcement.find(params[:id])
      if announcement
        announcement.destroy
        render json: {success: true}
      else
        render json: {error: "Announcement not found"}, status: :not_found
      end
    end

    def update
      unless @user.admin?
        return render json: {error: 'Unauthorized'}, status: :forbidden
      end

      announcement = Announcement.find(params[:id])
      if announcement.update(announcement_params)
        render json: {success: true}
      else
        render json: {error: "Could not update announcement"}, status: :unprocessable_entity
      end
    end

    private

    def announcement_params
      params.require(:announcement).permit(:title, :content)
    end

  end
end