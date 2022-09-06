class CreateSwipeRecords < ActiveRecord::Migration[6.1]
  def change
    create_table :swipe_records do |t|
      t.integer :user_id
      t.integer :other_id

      t.timestamps
    end
  end
end
