module Api
  class EventsController < ApplicationController
    before_action :authenticate_user!, only: [:create, :destroy, :update]

    def index
      @events = Event.order(date: :desc)
      if @events
        render json: {events: @events}, status: :ok
      else
        render json: {error: 'events not found'}, status: :not_found
      end
    end

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

    def update
      unless @user.admin?
        return render json: {error: 'Unauthorized'}, status: :forbidden
      end

      event = Event.find(params[:id])

      if event.update(event_params)
        render json: {success: true}, status: :ok
      else
        render json: {error: 'Error updating event'}, status: :unprocessable_entity
      end
    end

    def destroy
      unless @user.admin?
        return render json: {error: 'Unauthorized'}, status: :forbidden
      end

      event = Event.find(params[:id])
      if event
        event.destroy
        render json: {success: true}, status: :ok
      else
        render json: {error: 'Event not found'}, status: :not_found
      end
    end

    def show
      event = Event.find(params[:id])
      if event
        render json: {event: event}, status: :ok
      else
        render json: {error: 'Event not found'}, status: :not_found
      end
    end

    private

    def event_params
      params.require(:event).permit(:title, :description, :date, :start_time, :end_time, :location, :address, :multi_day, :notes, :members_only, :registration_link)
    end
  end
end