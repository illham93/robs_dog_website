class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def login
    render 'login'
  end

  # Admin
  def admin_home
    render 'admin_home'
  end
end
