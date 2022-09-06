class Addavgpoints < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :avg_points, :decimal, array: true, default: []
  end
end
