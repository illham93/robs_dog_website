module Api
  class SponsorsController < ApplicationController

    before_action :authenticate_user!, only: [:create, :delete]

    def index
      sponsors = Sponsor.all
      if sponsors
        sponsors_with_images = sponsors.map do |sponsor|
          image_url = sponsor.image.attached? ? url_for(sponsor.image) : nil
          sponsor.as_json.merge(image_url: image_url)
        end
        render json: {sponsors: sponsors_with_images}, status: :ok
      else
        render json: {error: 'Sponsors not found'}, status: :not_found
      end
    end

    def create
      unless @user.admin?
        return render json: {error: 'Unauthorized'}, status: :forbidden
      end

      @sponsor = Sponsor.new(sponsor_params)
      if @sponsor.save
        render json: {success: true, sponsor: @sponsor}, status: :created
      else
        render json: {error: @sponsor.errors.full_messages}, status: :unprocessable_entity
      end
    end

    def delete
      unless @user.admin?
        return render json: {error: 'Unauthorized'}, status: :forbidden
      end

      sponsor = Sponsor.find(params[:id])
      if sponsor
        sponsor.destroy
        render json: {success: true}, status: :ok
      else
        render json: {error: "Sponsor not found"}, status: :not_found
      end
    end

    private

    def sponsor_params
      params.permit(:title, :url, :category, :image)
    end
  end
end