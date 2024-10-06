module Api
  class AnnouncementsController < ApplicationController
    before_action :authenticate_user!, only: [:create, :destroy, :update]

    def index
      @announcements = Announcement.order(created_at: :desc)
      if @announcements
        render json: {announcements: @announcements}, status: :ok
      else
        render json: { error: 'announcements not found' }, status: :not_found
      end
    end

    def create
      unless @user.admin?
        return render json: {error: 'Unauthorized'}, status: :forbidden
      end

      Rails.logger.debug "Incoming params: #{params.inspect}"

      @announcement = Announcement.new(announcement_params)
      if @announcement.save
        render json: {success: true}
      else
        render json: {error: "Error creating announcement"}, status: :unprocessable_entity
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
      params.require(:announcement).permit(:title, :content, :link)
    end

  end
end