class CreateChannels < ActiveRecord::Migration[6.1]
  def change
    create_table :channels do |t|
      t.text :caption
      

      t.timestamps
    end
  end
end
