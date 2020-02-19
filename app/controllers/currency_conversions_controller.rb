class CurrencyConversionsController < ApplicationController
  def index
    respond_to do |format|
      format.html
      format.json
    end
  end

  def get_currency_history
    conversion_rate = ConversionRate.new(params) if params[:currency].present?
    get_conversion_rate = conversion_rate.get_conversion_rate if conversion_rate.present?
    render :json => get_conversion_rate
  end
end
