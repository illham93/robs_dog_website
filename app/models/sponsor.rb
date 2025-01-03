class Sponsor < ApplicationRecord

  has_one_attached :image

  validates :title, :category, presence: true
end
