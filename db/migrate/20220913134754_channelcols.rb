class Channelcols < ActiveRecord::Migration[7.0]
  def change
    add_column :channels, :user_id, :integer 
    add_column :channels, :match_id, :integer
  end
end
