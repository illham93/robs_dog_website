class User < ApplicationRecord
  has_many :sessions
  
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  
  validates :email, presence: true, length: {minimum: 5, maximum: 100}, uniqueness: { case_sensitive: false }, format: { with: VALID_EMAIL_REGEX, message: " address is not valid" }

  before_save :hash_password, if: :password_changed?

  def admin?
    self.admin
  end

  private 

  def hash_password
    if password.present? && !password.starts_with?('$2a$')
      self.password = BCrypt::Password.create(password)
    end
  end
end
