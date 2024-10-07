module Api
  class DogOfTheMonthController < ApplicationController
    def index
      @dog_of_the_month = DogOfTheMonth.first
      if @dog_of_the_month
        render json: {dog: @dog_of_the_month}, status: :ok
      else
        render json: {error: 'Dog of the month not found'}, status: :not_found
      end
    end
  end
end