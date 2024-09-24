Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # 
  root to: "static_pages#home"

  get '/login' => 'static_pages#login'

  namespace :api do
    
    get '/authenticated' => 'sessions#authenticated'
  end
end
