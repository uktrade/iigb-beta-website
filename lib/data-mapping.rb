def read_from_csv(filename)
  row_array = []
  CSV.foreach(filename, headers: true) do |row|
    row_array << row.to_hash
  end
  row_array
end

def load_csvs
  @dots = read_from_csv('/Users/Matt.Nicks/Downloads/map-data.csv')
  @location_joins = read_from_csv('/Users/Matt.Nicks/Downloads/location-to-dot.csv')
  @location_data = read_from_csv('/Users/Matt.Nicks/Downloads/location-data.csv')
  @sector_mapping = read_from_csv('/Users/Matt.Nicks/Downloads/sector-mapping.csv')
  @region_paths = read_from_csv('/Users/Matt.Nicks/Downloads/region-paths.csv')
end

def map_data
  @dots.each do |dot|
    current_joins = @location_joins.select{ |join| join['dotId'] == dot['id'] }
    joined_data = []
    current_joins.each do |join|
      @location_data.each do |l_data|
        if l_data['Town\\City'] == join['locationName']
          joined_data << l_data
        end
      end
    end

    @sector_mapping.each do |sector|
      dot[sector['iigb_sector']] = 0
    end

    joined_data.each do |data|
      @sector_mapping.each do |sector|
        dot[sector['iigb_sector']] = dot[sector['iigb_sector']] + data[sector['data_sector']].to_i
      end
    end

    @sector_mapping.each do |sector|
      dot[sector['iigb_sector']] = joined_data.count > 0 ? dot[sector['iigb_sector']] / joined_data.count : 0
    end
  end
end

def write_json_out
  map_data = {}
  map_data['radius'] = 6
  map_data['baseValue'] = 15
  map_data['points'] = @dots
  map_data['paths'] = @region_paths
  File.open('./src/assets/uk-map.json', 'w') do |f|
    f.write(JSON.pretty_generate(map_data))
  end
end

def process_map_data
  require 'csv'
  require 'json'

  @dots = []
  @location_joins = []
  @location_data = []
  @sector_mapping = []
  @region_paths = []

  load_csvs
  map_data
  write_json_out
end

process_map_data
