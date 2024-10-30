module Api
  class EventsController < ApplicationController
    before_action :authenticate_user!, only: [:create, :destroy, :update]

    def create
      unless @user.admin?
        return render json: {error: 'Unauthorized'}, status: :forbidden
      end

      @event = Event.new(event_params)
      if @event.save
        render json: {success: true}
      else
        render json: {error: "Error creating event"}, status: :unprocessable_entity
      end
    end

    private

    def event_params
      params.permit(:title, :description, :date, :start_time, :end_time, :location, :multi_day)
    end
  end
end