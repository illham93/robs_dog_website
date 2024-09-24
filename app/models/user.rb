class User < ApplicationRecord
  has_many :sessions
  
  validates :email, presence: true, {minimum: 5, maximum: 100}

  validates_uniqueness_of :email

  after_validation :hash_password

  private 

  def hash_password
    self.password = BCrypt::Password.create(password)
  end
end
