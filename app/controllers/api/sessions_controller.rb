module Api
  class SessionsController < ApplicationController
    def create
      @user = User.find_by(email: params[:user][:email])

      if @user && (BCrypt::Password.new(@user.password) == params[:user][:password])
        session = @user.sessions.create
        cookies.permanent.signed[:session_token] = {
          value: session.token,
          httponly: true
        }

        render 'api/sessions/create', status: :created
      else
        render json: { error: 'Incorrect email or password' }, status: :unprocessable_entity
      end
    end

    def authenticated
      token = cookies.signed[:session_token]
      session = Session.find_by(token: token)

      if session
        @user = session.user
        render 'api/sessions/authenticated', locals: { admin: @user.admin?, member: @user.member? }, status: :ok
      else
        render json: {authenticated: false}, status: :ok
      end
    end

    def destroy
      token = cookies.signed[:session_token]
      session = Session.find_by(token: token)

      if session&.destroy
        cookies.delete(:session_token)
        render json: { success: true }, status: :ok
      else
        render json: {success: false}, status: :unproccesable_entity
      end
    end
  end
end