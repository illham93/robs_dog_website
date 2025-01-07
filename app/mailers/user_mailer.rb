class UserMailer < ApplicationMailer
  default from: 'lakeontariohrc@outlook.com'

  def event_registration_approved(user, event)
    @user = user
    @event = event
    mail(to: @user.email, subject: 'Your Event Registration is Approved')
  end
end
