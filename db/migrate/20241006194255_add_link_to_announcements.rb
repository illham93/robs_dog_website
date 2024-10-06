class AddLinkToAnnouncements < ActiveRecord::Migration[6.1]
  def change
    add_column :announcements, :link, :string, null: true, default: nil
  end
end
