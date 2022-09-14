Rails.application.routes.draw do
  
  resources :swipe_records
  resources :seentables
  resources :swipes
  resources :posts
  resources :tag_merges
  resources :channels
  resources :messages
  resources :tags
  resources :users, except: [:update]
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!

  patch "/users", to: "users#update"
  post "/login", to: "sessions#login"
  post "/newpost", to: "posts#create_many"
  patch "/position", to: "users#position"
  delete "/logout", to: "sessions#logout"
  get "/batch", to: "users#batch"
  get "/points", to: "users#points"
  get "/auth", to: "sessions#show"
  get "/map", to: "users#map_users"
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
