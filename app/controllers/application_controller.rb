class ApplicationController < ActionController::API
  include ActionController::Cookies
  include ActiveStorage::Blob::Analyzable
  
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  before_action :validate_user, except: [:create]

  private

  def record_invalid invalid
    render json: {errors: invalid.record.errors.full_messages}
  end

  def record_not_found invalid
    render json: {errors: invalid.message}
  end
  
  def validate_user
      if !session[:user_id]
          render json: {errors:"Unauthorized User"}
      end
  end

  def current_user
    if session[:user_id]
      @current_user ||= User.find(session[:user_id])
    end
  end
end
