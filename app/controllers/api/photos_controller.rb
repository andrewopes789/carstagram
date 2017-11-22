class Api::PhotosController < ApplicationController
  def index
    if params[:profile]
      @photos = current_user.profile_photos
    else
      @photos = current_user.feed
    end
  end

  def show
    @photo = Photo.find(params[:id])
  end

  def create
    @photo = Post.new(photo_params)

    if @photo.save
      render :show
    else
      render json: @photo.errors.full_messages, status: 422
    end
  end

  def update
    @photo = current_user.photos.find(params[:id])

    if @photo.update(photo_params)
      render :show
    else
      render json: @photo.errors.full_messages, status: 422
    end
  end

  def destroy
    @photo = current_user.photos.find(params[:id])

    if @photo.destroy
      render :show
    else
      render json: @photo.errors.full_messages, status: 422
    end
  end

  private

  def photo_params
    params.require(:photo).permit(:img_url, :caption)
  end
end
