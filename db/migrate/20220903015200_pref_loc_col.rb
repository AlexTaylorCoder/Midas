class PrefLocCol < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :pref_gender, :string
    add_column :users, :upper_range, :integer, default: 10
  end
end
