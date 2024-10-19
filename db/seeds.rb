# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

announcements = Announcement.create([
  { title: 'Announcement 1', content: 'This is an announcement. Next month there is going to be an event. Click here to sign up.' },
  { title: 'Announcement 2', content: "This is another announcement. Last month's event was a big success. Click here to read more." },
  { title: 'Announcement 3', content: "This is a final announcement. Euchre is the best dog ever." },
])

dogOfTheMonth = DogOfTheMonth.create([
  { 
    call_name: 'Euchre',
    registered_name: 'Euchre',
    about: 'Euchre is the best dog ever',
    titles: 'Euchre has won every title ever',
    owner: 'Bob Ronico',
  }
])

users = User.create([
  { email: 'bob@test.com', password: 'testpass', admin: 0, member: 0, first_name: 'bob', last_name: 'jackson', phone: 123-456-7891, town: 'Toronto' },
  { email: 'alice@test.com', password: 'testpass', admin: 0, member: 0, first_name: 'Alice', last_name: 'Smith', phone: 123-456-7891, town: 'Ottawa' },
  { email: 'charles@test.com', password: 'testpass', admin: 0, member: 0, first_name: 'Chalres', last_name: 'Matthews', phone: 123-456-7891, town: 'Guelph' },
  { email: 'david@test.com', password: 'testpass', admin: 0, member: 0, first_name: 'David', last_name: 'Davidson', phone: 123-456-7891, town: 'Kingston' },
  { email: 'katie@test.com', password: 'testpass', admin: 0, member: 1, first_name: 'Katie', last_name: 'McPhee', phone: 123-456-7891, town: 'Toronto' },
  { email: 'ken@test.com', password: 'testpass', admin: 0, member: 1, first_name: 'Ken', last_name: 'Hope', phone: 123-456-7891, town: 'Peterborough' },
  { email: 'elliot@test.com', password: 'testpass', admin: 0, member: 1, first_name: 'Elliot', last_name: 'Rogers', phone: 123-456-7891, town: 'Cobourg' },
  { email: 'mary@test.com', password: 'testpass', admin: 0, member: 1, first_name: 'Mary', last_name: 'Phillips', phone: 123-456-7891, town: 'Ottawa' },
])