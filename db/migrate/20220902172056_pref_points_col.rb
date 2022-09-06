class PrefPointsCol < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :pref_points, :decimal, array: true, default: []
  end
end
