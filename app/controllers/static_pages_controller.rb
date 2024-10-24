class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def members
    render 'members'
  end

  def events
    render 'events'
  end
  
  def login
    render 'login'
  end

  # Admin
  def admin_home
    render 'admin_home'
  end

  def admin_members
    render 'admin_members'
  end

  def admin_events
    render 'admin_events'
  end
end
