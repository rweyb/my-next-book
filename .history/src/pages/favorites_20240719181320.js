import React from "react";
import FavoriteButton from "@/app/books/[[...keyword]]/FavoriteButton";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import {  FavoritesBookState, FavoritesSelector } from '../state/FavoritesBookState';



const FavoritesPage = () => {

    // Recoilの状態更新関数を取得
    const setFavoritesList = useSetRecoilState(FavoritesBookState);


    // Recoilからお気に入りのリストを取得
    const favorites = useRecoilValue(FavoritesSelector);

     // favorites.detailsが配列であることを確認
        if (!Array.isArray(favorites.details)) {
        console.error('favorites.details is not an array:', favorites.details);
        return <div>お気に入りの情報を読み込めませんでした。</div>;
        }

    // お気に入り追加
    const addFavorite = (newItem) => {
        setFavoritesList((lists) => [...lists, newItem.id]);
    };

    // お気に入りから削除
    const removeFavorite = (id) => {
        setFavoritesList((lists) => lists.filter((favId) => favId !== id));
    };
    
        return (
            <div>
                <h1>お気に入り</h1>
                <ul>
                    {favorites.details.map((item) => (
                        <li key={item.id}>
                            {item.title} {/* ここでタイトルを表示 */}
                            <FavoriteButton 
                                item={item}
                                onAddFavorite={() => addFavorite(item)}
                                onRemoveFavorite={() => removeFavorite(item.id)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
    

export default FavoritesPage;

