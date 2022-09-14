class Matchswipe < ActiveRecord::Migration[7.0]
  def change
    add_column :swipes, :match, :boolean, default: false
  end
end
