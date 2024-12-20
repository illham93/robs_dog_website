module Api
  class DogOfTheMonthController < ApplicationController
    before_action :authenticate_user!, only: [:update, :create]

    def index
      @dogs = DogOfTheMonth.order(date: :desc)
      if @dogs
        dogs_with_images = @dogs.map do |dog|
          image_url = dog.image.attached? ? url_for(dog.image) : nil
          dog.as_json.merge(image_url: image_url)
        end
        render json: {dogs: dogs_with_images}, status: :ok
      else
        render json: {error: 'dogs not found'}, status: :not_found
      end
    end

    def show
      dog = DogOfTheMonth.last
      if dog
        image_url = dog.image.attached? ? url_for(dog.image) : nil
        render json: {
          dog: dog.as_json.merge(image_url: image_url)
        }, status: :ok
      else
        render json: {error: 'Dog of the month not found'}, status: :not_found
      end
    end

    def create
      unless @user.admin?
        return render json: {error: 'Unauthorized'}, status: :forbidden
      end

      @dog_of_the_month = DogOfTheMonth.new(dog_params)
      if @dog_of_the_month.save
        render json: {success: true}
      else
        render json: {error: "Error adding dog of the month"}, status: :unprocessable_entity
      end
    end

    def update
      unless @user.admin?
        return render json: {error: 'Unauthorized'}, status: :forbidden
      end

      dog = DogOfTheMonth.find(params[:id])

      if params[:image]
        dog.image.attach(params[:image])
      end

      if dog.update(dog_params)
        render json: {success: true}
      else
        render json: {error: "Could not update dog of the month"}, status: :unprocessable_entity
      end
    end

    private

    def dog_params
      params.permit(:call_name, :registered_name, :titles, :owner, :about, :image)
    end

  end
end