class User < ApplicationRecord
  has_many :sessions
  
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  
  validates :email, presence: true, length: {minimum: 5, maximum: 100}, uniqueness: { case_sensitive: false }, format: { with: VALID_EMAIL_REGEX, message: " address is not valid" }

  after_validation :hash_password

  def admin?
    self.admin
  end

  private 

  def hash_password
    self.password = BCrypt::Password.create(password)
  end
end
