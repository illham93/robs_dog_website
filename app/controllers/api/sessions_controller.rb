module Api
  class SessionsController < ApplicationController
    def create
      @user User.find_by(email: params[:user][:email])

      if @user && (BCrypt::Password.new(@user.password) == params[:user][:password])
        session = @user.sessions.create
        cookies.permanent.signed[:session_token] = {
          value: session.token
          httponly: true
        }

        render 'api/sessions/create', status: :created
      else
        render json: {success: false}, status: :bad_request
      end
    end

    def authenticated
      token = cookies.signed[:session_token]
      session = Session.find_by(token: token)

      if session
        @user = session.user
        render 'api/sessions/authenticated', status: :ok
      else
        render json: {authenticated: false}, status: :bad_request
      end
    end

    def destroy
      token = cookies.signed[:session_token]
      session = Session.find_by(token: token)

      if session&.destroy
        cookies.delete(:session_token)
        redirect_to root_path
      else
        render json: {success: false}, status: :unproccesable_entity
      end
    end
  end
end