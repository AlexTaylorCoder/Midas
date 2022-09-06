# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

USER_ITER = 20


USER_ITER.times do 

    User.create(first_name:Faker::Name.first_name, last_name:Faker::Name.last_name,
        email:Faker::Internet.email,lat:rand(30..60),lng:rand(30..60))
end

