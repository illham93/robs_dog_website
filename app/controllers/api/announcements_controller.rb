module Api
  class AnnouncementsController < ApplicationController
    def index
      @announcements = Announcement.order(created_at: :desc)
      if @announcements
        render 'api/announcements/index', status: :ok
      else
        render json: { error: 'announcements not found' }, status: :not_found
      end
    end
  end
end