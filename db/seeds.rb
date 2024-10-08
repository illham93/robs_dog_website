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