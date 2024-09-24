Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # 
  root to: "static_pages#home"

  get '/login' => 'static_pages#login'

  namespace :api do
    
    post '/sessions' => 'sessions#create'
    delete '/sessions' => 'sessions#destroy'
    get '/authenticated' => 'sessions#authenticated'

    post '/users' => 'users#create'
  end
end
