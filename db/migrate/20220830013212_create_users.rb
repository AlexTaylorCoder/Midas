class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.integer :age
      t.string :email
      t.decimal :lat
      t.decimal :lng
      t.string :gender
      t.string :bio

      t.timestamps
    end
  end
end
