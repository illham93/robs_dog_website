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

  def event_info
    render 'event_info'
  end

  def hall_of_fame
    render 'hall_of_fame'
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

  def admin_hall_of_fame
    render 'admin_hall_of_fame'
  end
end
