module Api
  class DogOfTheMonthController < ApplicationController
    before_action :authenticate_user!, only: [:update]

    def index
      @dog_of_the_month = DogOfTheMonth.first
      if @dog_of_the_month
        render json: {dog: @dog_of_the_month}, status: :ok
      else
        render json: {error: 'Dog of the month not found'}, status: :not_found
      end
    end

    def update
      unless @user.admin?
        return render json: {error: 'Unauthorized'}, status: :forbidden
      end

      dog = DogOfTheMonth.first
      if dog.update(dog_params)
        render json: {success: true}
      else
        render json: {error: "Could not update dog of the month"}, status: :unprocessable_entity
      end
    end

    private

    def dog_params
      params.require(:dog_of_the_month).permit(:call_name, :registered_name, :titles, :owner, :about, :image_url)
    end

  end
end