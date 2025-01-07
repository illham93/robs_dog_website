class Event < ApplicationRecord
  has_many :event_signups, dependent: :destroy
  has_many :signed_up_users, through: :event_signups, source: :user
end
