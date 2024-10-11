Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # 
  root to: "static_pages#home"

  get '/login' => 'static_pages#login'
  
  # Admin
  get '/admin/home' => 'static_pages#admin_home'
  get '/admin/members' => 'static_pages#admin_members'

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
  end
end
