class User < ApplicationRecord
  has_many :user_meetings, dependent: :delete_all
  has_many :meetings, through: :user_meetings
  has_secure_password validations: false
  validates :first_name, presence: true
  validates :last_name, presence: true
end
