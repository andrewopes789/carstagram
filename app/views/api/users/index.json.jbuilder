json.users do
  @users.each do |user|
    json.set! user.id do
      json.partial! '/api/users/user', user: user
    end
  end
end

json.photos do
  @photos.each do |photo|
    json.set! photo.id do
      json.partial! '/api/photos/photo', photo: photo
    end
  end
end
