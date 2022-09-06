class SessionsController < ApplicationController
    skip_before_action :validate_user, except: [:logout,:show]
    
    def show
        render json: current_user
    end

    def login
        if params[:email]
            @user = User.find_by(email: params[:email])
        elsif params[:phone]
            @user = User.find_by(phone: params[:phone])
        elsif params[:googleId]
            @user = User.find_by(googleId: params[:googleId])
            if !@user
                render json: {errors: "Could not find Google ID!"}
            else
                session[:user_id] = @user.id #Hits here
                render json: @user
            end
            return
        end
        
        if @user&.authenticate(params[:password])
            session[:user_id] = @user.id
            render json: @user, status: 202
        else
            render json: {error: "Invalid username or password"}
        end
    end

    def logout 
        session.destroy
        head :no_content
    end
end
