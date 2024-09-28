Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # 
  root to: "static_pages#home"

  get '/login' => 'static_pages#login'
  get '/admin' => 'static_pages#admin'

  namespace :api do
    #sessions
    post '/sessions' => 'sessions#create'
    delete '/sessions' => 'sessions#destroy'
    get '/authenticated' => 'sessions#authenticated'

    #announcements
    get '/announcements' => 'announcements#index'
    delete '/announcements/:id' => 'announcements#destroy'

    post '/users' => 'users#create'
  end
end
