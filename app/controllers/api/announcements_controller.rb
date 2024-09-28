module Api
  class AnnouncementsController < ApplicationController
    def index
      @announcments = Announcement.order(created_at: :desc)
      if @announcments
        render 'api/announcements/index', status: :ok
      else
        render json: { error: 'announcements not found' }, status: :not_found
      end
    end
  end
end