json.announcements do
  json.array! @announcements do |announcement|
    json.id announcement.id
    json.title announcement.title
    json.content announcement.content
    json.updated_at announcement.updated_at
  end
end