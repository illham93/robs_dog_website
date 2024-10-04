class ApplicationController < ActionController::Base

  private

  def authenticate_user!
    token = cookies.signed[:session_token]
    session = Session.find_by(token: token)

    if session
      @user = session.user
    else
      render json: {authenticated: false}, status: :unauthorized
    end
  end
end
