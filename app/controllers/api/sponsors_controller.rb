module Api
  class SponsorsController < ApplicationController

    before_action :authenticate_user!, only: [:create]

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

    private

    def sponsor_params
      params.permit(:title, :url, :category, :image)
    end
  end
end