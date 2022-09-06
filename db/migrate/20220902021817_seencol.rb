class Seencol < ActiveRecord::Migration[6.1]
  def change
    add_column :swipe_records, :seen, :boolean, default: false
  end
end
