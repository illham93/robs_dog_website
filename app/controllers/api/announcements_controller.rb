module Api
  class AnnouncementsController < ApplicationController
    before_action :authenticate_user!, only: [:destroy]

    def index
      @announcements = Announcement.order(created_at: :desc)
      if @announcements
        render json: {announcements: @announcements}, status: :ok
      else
        render json: { error: 'announcements not found' }, status: :not_found
      end
    end

    def destroy
      announcement = Announcement.find(params[:id])
      if announcement
        announcement.destroy
        render json: {success: true}
      else
        render json: {error: "Announcment not found"}, status: :not_found
      end
    end

  end
end