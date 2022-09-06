class Userlatlng < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :lat, :decimal
    add_column :users, :lng, :decimal
  end
end
