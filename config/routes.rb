Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # 
  root to: "static_pages#home"

  # Pages
  get '/login' => 'static_pages#login'
  get '/members' => 'static_pages#members'
  get '/events' => 'static_pages#events'
  get '/events/:id' => 'static_pages#event_info'
  
  # Admin
  get '/admin/home' => 'static_pages#admin_home'
  get '/admin/members' => 'static_pages#admin_members'
  get '/admin/events' => 'static_pages#admin_events'

  namespace :api do
    #sessions
    post '/sessions' => 'sessions#create'
    delete '/sessions' => 'sessions#destroy'
    get '/authenticated' => 'sessions#authenticated'

    #announcements
    get '/announcements' => 'announcements#index'
    post '/announcements' => 'announcements#create'
    put 'announcements/:id' => 'announcements#update'
    delete '/announcements/:id' => 'announcements#destroy'

    #dog of the month
    get '/dog-of-the-month' => 'dog_of_the_month#index'
    put '/dog-of-the-month' => 'dog_of_the_month#update'

    #users
    get '/users' => 'users#index'
    post '/users' => 'users#create'
    put '/users/:id' => 'users#update'
    put '/users/:id/add-member' => 'users#add_member'
    put '/users/:id/remove-member' => 'users#remove_member'

    #events
    get '/events' => 'events#index'
    post '/events' => 'events#create'
    put '/events/:id' => 'events#update'
    delete '/events/:id' => 'events#destroy'
    get '/event/:id' => 'events#show'

    #event signups
    get '/event_signups/:user_id/:event_id' => 'event_signups#show'
    post '/event_signups/:user_id/:event_id' => 'event_signups#create'
    delete '/event_signups/:user_id/:event_id' => 'event_signups#delete'
  end
end
