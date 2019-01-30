class ApplicationController < ActionController::API
	def current_user
		# Use Authorization header to get the token
		token = request.headers['Authorization']
		# Get token from header
		decoded_token = decode_token(token)
		# Decoded token will have user id
		id = decoded_token['id']
		#  Now we can find user
		User.find_by(id: id)
	end

	def issue_token(data)
		JWT.encode(data, secret)
	end

	def decode_token(token)
		begin
			JWT.decode(token, secret).first
		rescue
			{}
		end
  end

  def secret
    "shhh"
  end
end
