import { useEffect, useState } from "react";
import { Button, Spinner } from "../../components";
import Select, { MultiValue } from "react-select";
import { useSearchTags } from "../../api/tag";
import { Tag } from "../../types/Tag";
3
interface Props {
  handleSubmit: () => void;
  loading: boolean;
  selectedTagIdsState: {
    selectedTagIds: number[],
    setSelectedTagIds: React.Dispatch<React.SetStateAction<number[]>>
  }
}

const InterestsStep = ({ handleSubmit, loading, selectedTagIdsState }: Props) => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const {selectedTagIds, setSelectedTagIds} = selectedTagIdsState;
  const { data, refetch, isLoading } = useSearchTags(searchKeyword);

  useEffect(() => {
    refetch();
  }, [searchKeyword]);

  useEffect(() => {
    console.log(selectedTagIds)
  }, [selectedTagIds]);

  const loadOptions = () => {
    if (!isLoading && data) {
      const tags = data as Tag[];
      return tags.map((tag) => ({
        value: tag.id,
        label: tag.name,
      }));
    }
  };

  const onChange = (selectedOptions: MultiValue<{
    value: number;
    label: string;
}>) => {
    setSelectedTagIds(selectedOptions.map(option => {
      return option.value
    }))
  }

  return (
    <div>
      Interests
      <Select
        isMulti
        options={loadOptions()}
        onInputChange={(keyword) => setSearchKeyword(keyword as string)}
        onChange={onChange}
      />
      <Button onClick={handleSubmit} styles="mt-5 text-lg">
        {loading ? <Spinner /> : "Get Started"}
      </Button>
    </div>
  );
};

export default InterestsStep;
